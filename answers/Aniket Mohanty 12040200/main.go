package main

import (
    "log"
    "net/http"
)

func main() {
    // Handle HTTP requests on `/`
    http.Handle("/", http.FileServer(http.Dir("./client/build")))

    // Start the server on localhost port 8080
    log.Println("Server starting on http://localhost:8080...")
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
