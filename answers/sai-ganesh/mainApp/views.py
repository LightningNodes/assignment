from django.shortcuts import render, redirect

import firebase_admin
from firebase_admin import auth as firebase_auth
from firebase_admin import credentials

# Initialize Firebase Admin SDK
cred = credentials.Certificate(r"C:\Users\DELL\Desktop\pi42-assignment-IIT-BHILAI\pi42\pi42-assignment-21513-firebase-adminsdk-dqvfm-7ee226fb0e (1).json")
firebase_admin.initialize_app(cred)

def home(request):
    return render(request, 'home.html')


def renderCryptoTable(request):
    return render(request, 'cryptoTable.html')
            

def signup(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        try:
            # Create a new username
            user = firebase_auth.create_user(email=email, password=password)

            # Direct to the login page once the sign in is successful
            return redirect('login')

        except Exception as e:
            error_message = str(e)
            
            # Check if the error message indicates that the password is invalid
            if 'invalid password' in error_message.lower():
                error = "Password must be a string at least 6 characters long."
            else:
                error = error_message
            print(error_message)
            return render(request, 'signup.html', {'error_message': error_message})
    else:
        return render(request, 'signup.html')


def login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        try:
            # Get the username by email
            user = firebase_auth.get_user_by_email(email)
            
            # return render(request, 'cryptoTable.html')
            return redirect('renderCryptoTable')

        except Exception as e:
            error_message = str(e)
            print(error_message)
            # Check if the error message indicates that the email is invalid
            if 'invalid email' in error_message.lower():
                error_message = 'Invalid email'
            
            return render(request, 'login.html', {'error_message': error_message})
        
    else:
        return render(request, 'login.html')

