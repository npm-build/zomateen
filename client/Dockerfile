FROM node as build
WORKDIR /usr/src/client
ENV PATH /usr/src/client/node_modules/.bin:$PATH
COPY package.json /usr/src/client
RUN yarn install --silent
COPY . /usr/src/client
RUN npm run build
# EXPOSE 5000

FROM nginx:1.13.12-alpine
COPY --from=build /usr/src/client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]