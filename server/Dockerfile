FROM node
WORKDIR /usr/src/server
ENV PATH /usr/src/server/node_modules/.bin:$PATH
COPY package.json /usr/src/server
RUN yarn install --silent
COPY . /usr/src/server
CMD ["yarn","start"]
EXPOSE 8000