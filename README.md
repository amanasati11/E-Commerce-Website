# E-Commerce-Website
## A Full-stack application with payment gateway integration in Django and React.
![django-react-header](https://user-images.githubusercontent.com/69810375/105145074-3a4ce400-5b24-11eb-84a7-8dda84db3e32.png)

## Features
- This project is broken up into a backend and frontend.
- The project contains backend user authentication with the Django Rest Framework and rest-auth.
- The frontend uses React and queries data from the API.
- Users can create their account, add items to their cart and purchase those items using Braintree payment gateway.

## Workflow
![1_lAMsvtB6afHwTQYCNM1xvw](https://user-images.githubusercontent.com/69810375/105146430-ff4bb000-5b25-11eb-8843-5576b723e10f.jpg)

## Technology Used
- Python
- Django
- Django REST Framework
- JavaScript
- React
- Bootstrap

### Running the project
- Open a command line window and go to the project's directory.
- `pip install -r requirements.txt && pip install -r dev-requirements.txt`
- `npm install`
- `npm run start`
- Open another command line window.
- `workon theprojectname` or `source theprojectname/bin/activate` depending on if you are using virtualenvwrapper or just virtualenv.
- Go to the `backend` directory.
- `python manage.py runserver`
