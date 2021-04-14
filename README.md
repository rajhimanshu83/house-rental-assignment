# Rental House Management React Application

# Application Stack

React
MongoDB
Node
Express
Antd

## API EntryPoint

* dev  http://localhost:8000/ 

## Client EntryPoint

* dev  http://localhost:3000/ 


## UI Pages
Homepage/Houses
Visitation
Visitaion Form 
Select Slot

## To run Project locally

```
npm i 
cd client 
npm i
npm run build
npm start
cd ..
npm start

Run the project --> npm run dev


```
### API Endpoints

```
Houses
method:get '/house

Slot, PropertyDetails
method:get '/:sid'

Available Slots
method:get '/slot/:hid/:sdate'

Visitation Details
method:get '/visitation/:vid'

Add visitation
method:post '/visitation/add' body: { name,phone,email,slot,propertyId,visitDate }

```
### Database Schema

## Visitation schema
```
 name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  realtor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Realtor",
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
  },
  visitDate: {
    type: Date,
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
},

```

## Slot schema
```
    duration: {
    type: Number,
    required: true
  },
  dayOfWeek: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  realtor: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
  },
  startTime: {
    type: String,
  }

```

## House schema
```
 title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
  },

```