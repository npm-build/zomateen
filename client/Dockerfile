FROM node
WORKDIR /src
COPY package.json /src
RUN npm install
COPY . /server
CMD ["npm","build"]
EXPOSE 5000