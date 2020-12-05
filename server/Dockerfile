FROM node
WORKDIR /src
COPY package.json /src
RUN npm install
COPY . /server
CMD ["npm","start"]
EXPOSE 8000