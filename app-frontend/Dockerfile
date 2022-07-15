FROM node:17.7.1-alpine3.14

WORKDIR /app

RUN npm i npm -g
RUN npm i react-scripts
RUN npm i axios react-bootstrap bootstrap react-router-dom sweetalert2 --save
RUN npm i font-awesome --save
RUN npm i react-password-strength-bar --save
RUN npm i particles-bg --save
RUN npm i web-vitals --save-dev
RUN npm i devextreme --save
RUN npm i devextreme-react --force
RUN npm i react-avatar-edit --force
RUN npm i react-fileupload-progress --force
RUN npm i react-icons
RUN npm i react-datepicker
#RUN npm i react-scripts


#RUN npm i npm-run-all --save-dev

#ADD package.json .

# eject CRA so we can modify the webpack config
#RUN echo 'y' | npm run eject -y

# modify webpack config
# for editing outside docker container
#RUN sed -i '$ d' config/webpack.config.dev.js
#RUN echo "watchOptions: {\npoll: 100\n},\n};" >> config/webpack.config.dev.js
#RUN sed -i '/watchOptions/a    poll: 100,' config/webpackDevServer.config.js


# configure proxy (let's frontend talk to backend)
# this assumes the backend docker container will be names "api"
#RUN sed '$i,\n"proxy": "http://localhost:8000/"' package.json >> package.json.new
#RUN sed '$i,\n"proxy": "http://api:3001",\n "homepage": "./docker/"\n' package.json >> package.json.new
#RUN cp package.json.new package.json

#RUN npm i webpack webpack-dev-server --save-dev
#RUN npm i -D webpack-cli --save
#RUN npm i -D @expo/webpack-config
#RUN npm i chokidar
#RUN npm i npm-watch

#EXPOSE 3000

#CMD ["npm", "start"]
#CMD ["npm", "run", "eject"]


#RUN npm run build
#ENTRYPOINT npm run start