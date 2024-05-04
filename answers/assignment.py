import pyrebase
import streamlit as st
import time

import asyncio
import websockets 
import websocket  
import json
from time import sleep
config = config = {
    "apiKey": "AIzaSyDVG7uu_sU7pPATLQN0SxSiQwe0zPEJaXk",
    "authDomain": "realdata-d1b69.firebaseapp.com",
    "projectId": "realdata-d1b69",
    "storageBucket": "realdata-d1b69.appspot.com",
    "messagingSenderId": "825911172803",
    "appId": "1:825911172803:web:3e0455a71aa2890b5e8c76",
    "measurementId": "G-4Q3B7DE4YN",
    "databaseURL":""
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
# db = firebase.database()
# storage = firebase.storage()
st.sidebar.title("Our community app")

# Authentication
choice = st.sidebar.selectbox('login/Signup', ['Login', 'Sign up'])

# Obtain User Input for email and password
email = st.sidebar.text_input('Please enter your email address')
password = st.sidebar.text_input('Please enter your password',type = 'password')

# App 

# Sign up Block
if choice == 'Sign up':
    handle = st.sidebar.text_input(
        'Please input your app handle name', value='Default')
    submit = st.sidebar.button('Create my account')

    if submit:
        user = auth.create_user_with_email_and_password(email, password)
        st.success('Your account is created suceesfully!')
        # Sign in
        user = auth.sign_in_with_email_and_password(email, password)
        
        st.title('Welcome' + handle)
        st.info('Login via login drop down selection')

# Login Block
if choice == 'Login':
    login = st.sidebar.checkbox('Login')
    if login:
        user = auth.sign_in_with_email_and_password(email,password)
        st.write('<style>div.row-widget.stRadio > div{flex-direction:row;}</style>', unsafe_allow_html=True)
        bio = st.radio('Jump to',['home', 'Feeds'])
        if bio == "home":
            st.write("welcome")
        if bio=='Feeds':
            placeholder = st.empty()
            cc = 'btcusd'
            interval = '1d'
            url ="wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket"
            pcholder = st.empty()
            placeholder = st.empty()
            placeholder2 = st.empty()
            placeholder3 = st.empty()
            placeholder4 = st.empty()
            you = [pcholder,placeholder,placeholder2,placeholder3,placeholder4]
            async def hello():
                    def on_open(ws):
                        ws.send("40")
                    def on_message(ws,message):
                        msg = eval(message[2:])
                        req = msg[1]
                        col = ['BTCINR',"NEARINR","FILINR","1000FLOKIINR","XRPINR"]
                        
                        final = 'BTCINR; '+"lastprice:"+str(req['BTCINR']['lastPrice'])+" ; %_change:"+str(req['BTCINR']["priceChangePercent"])+" ; volume: "+str(req['BTCINR']["baseAssetVolume"])
                        pcholder.text(final)
                        placeholder2.text('NEARINR; '+"lastprice:"+str(req["NEARINR"]['lastPrice'])+" ; %_change:"+str(req["NEARINR"]["priceChangePercent"])+" ; volume: "+str(req["NEARINR"]["baseAssetVolume"]))
                        placeholder3.text('FILINR; '+"lastprice:"+str(req["FILINR"]['lastPrice'])+" ; %_change:"+str(req["FILINR"]["priceChangePercent"])+" ; volume: "+str(req["FILINR"]["baseAssetVolume"]))
                        placeholder.text('1000FLOKIINR; '+"lastprice:"+str(req["1000FLOKIINR"]['lastPrice'])+" ; %_change:"+str(req["1000FLOKIINR"]["priceChangePercent"])+" ; volume: "+str(req["1000FLOKIINR"]["baseAssetVolume"]))
                        placeholder4.text('XRPINR; '+"lastprice:"+str(req["XRPINR"]['lastPrice'])+" ; %_change:"+str(req["XRPINR"]["priceChangePercent"])+" ; volume: "+str(req["XRPINR"]["baseAssetVolume"]))

                    def on_close(ws):
                        print("connection closed")
                    ws = websocket.WebSocketApp(url,on_open = on_open,on_message = on_message,on_close = on_close)
                    ws.run_forever()
            asyncio.run(hello())