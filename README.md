# HelloWorld demo app
An application demonstrating my abilities as a software engineer. 

I designed this app using Node.js (relying on express.js for routing) MongoDB, JadeLang as a markup intermediary, jquery for flavor, and Bootstrap for aesthetics. 

## File structure:
**web.js** - Primary application entry point, and routing handler.  
**models.js** - Data model definitions live here, as well as other elements of the model.  
**/static** - Files that need to be statically accessed live here. (Bootstrap, jquery, etc).  
**/pages** - Jade pages live here and get rendered as needed by the application.  
**/pages/shared** - Elements that need to be shared between all pages (partials, header, includes) live here.  
**package.json** - Necessary for Node.js and npm to work properly.  
**/node_modules/** - All Node.js extensions live here.  
**Procfile** - Necessary for Heroku to recognize the application properly.  

## Testing:
You can access two primary links for this application at:  
[Register](http://ejd-helloworld.herokuapp.com/app/register) and [Admin Report](http://ejd-helloworld.herokuapp.com/app/admin)  
There is some data already in the database, but go ahead and add more.  
There are active validations on the frontend and on the backend, following more or less the same rules.  