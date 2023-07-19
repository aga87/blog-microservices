FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

# Clear the locally cached packages from the npm cache to ensure the image is as small as possible
RUN npm install && npm cache clean --force

COPY ./ ./

RUN npm run build  

CMD ["npm", "start"]


