## Tech stack
- Front-end: NextJS, Ant Design, TailwindCSS
- Back-end: NestJS
- Database: PostgreSQL

### Installation
#### Front-end
1. Go to source code by this command:
```
cd frontend
```
2. Start this server by using one of two commands
- Run with npm 
```
npm install
npm run dev
```
- Run with docker
```
docker build -t frontend .
docker run -p 3000:3000 frontend

```

#### Back-end server
1. Go to source code by this command:
```
cd backend
```
2. Start this server by using one of two commands
- Run with npm 
```
npm install
npm start
```
- Run with docker
```
docker build -t backend .
docker run -p 8080:8080 backend
```
