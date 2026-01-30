ArmorAtlas - User manual

Link to GitHub repository:

https://github.com/GuyRotshtein/ReactTankArchive.git


Project setup:
1. Install the dependancies:
    a. For the client side:

        * npm install

        *npm run dev



    b. For the server side (in a different command prompt window of course):

        * cd ./server

        * npm install

        *Create a .env file containing the following:

            * PORT=5000
            * MONGODB_URI= mongodb+srv://guyrot2010:Aa123456@armordb.udapobv.mongodb.net/?appName=ArmorDB
            * ADMIN_PASSWORD= < your favorite admin password?

        *npm run dev

2. The server will be up and runing on http://localhost:5000

There are no special instructions really, just that the images for the new tanks can only be added through the admin page (trust me, i tried. it just... doesn't work on the form page)

