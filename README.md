# HEKTOR-GUI

To start the web application:
1. edit the nodemon.json file by adding your mongo db credentials
2. ``` npm install ``` in the root directory of the project and in the frontend folder
3. start the server whith npm start (in the root directory of the project)
4. start the web app by navigating in the frontend folder and executing npm start

Must run on the robot:
1. ``` roslaunch rosbridge_server rosbridge_websocket.launch ```
2. ``` rosrun web_video_server web_video_server _port:=9000 ```
3. ``` rosrun tf2_web_republisher tf2_web_republisher ```

NOTE:
1. Use Google Chrome for best performance
