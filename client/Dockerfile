FROM node:20-alpine

# The env vars below solve the following bugs in CRA that prevent it from running correctly in a Docker container:
# - https://github.com/facebook/create-react-app/issues/8688
# - https://github.com/facebook/create-react-app/issues/11779
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

COPY package.json package-lock.json* ./

# Clear the locally cached packages from the npm cache to ensure the image is as small as possible
RUN npm install && npm cache clean --force

COPY ./ ./

CMD ["npm", "start"]
