URL status checker.

Installation:

    1. On your local computer create a virtual env using python 3.6:
        $ python3.6 -m venv some_name
    2. cd to that folder clone the project to current dir.
    3. docker compose up
    4. docker exec DB container and create database called - urlapp
    5. docker exec WEB container and create superuser for your convinience. Otherwise you'll not be able to see admin panel. 
    6. go to localhost:8000
    7. register or login
    8. add some urls
    9. update page 
    10. after that the page will be automatically update data every 4 seconds or you may set other interval.
    
HINT:
    To check the URL that doesn't work just add some custom typings:
        https://www.wikipedia.org/ ----> https://www.wikipedia.org/adawdawdawdfesf
         
Feel free to ask any questions about project or if you are having some problems running it )