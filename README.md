# Parking Lot Project
## Description :
This is Solution of Take Home Test from DKatalis Company.

## Problem Statement :
I own a parking lot that can hold up to 'n' cars at any given point in time. Each slot is given a number starting at 1 increasing with increasing distance from the entry point in steps of one. I want to create an automated ticketing system that allows my customers to use my parking lot without human intervention. When a car enters my parking lot, I want to have a ticket issued to the driver. The ticket issuing process includes us documenting the registration number (number plate) and the colour of the car and allocating an available parking slot to the car before actually handing over a ticket to the driver (we assume that our customers are nice enough to always park in the slots allocated to them). The customer should be allocated a parking slot which is nearest to the entry. At the exit the customer returns the ticket with the time the car was parked in the lot, which then marks the slot they were using as being available. Total parking charge should be calculated as per the parking time. Charge applicable is $10 for first 2 hours and $10 for every additional hour. We interact with the system via a simple set of commands which produce a specific output. Please take a look at the example below, which includes all the commands you need to support - they're self explanatory. The system should accept a filename as a parameter at the command prompt and read the commands from that file.

## Setup
```bash
git clone git@github.com:arjunsumarlan/parkinglotproblem.git
cd parkinglotproblem
npm install
```

## Usage :
### Create Parking Lot of Size n:
Make sure you already in project directory, then run this command
```bash
$ node . create_parking_lot {capacity}
```
*capacity* is size of lot you want to create

**example**
```bash
$ node . create_parking_lot 6
```
**result**
```bash
Created parking lot with 6 slots
```

## Park a Car:
Make sure you already in project directory, then run this command
```bash
$ node . park {car_number}
```
*car_number* is number plat of the car

**example**
```bash
$ node . park KA-01-HH-1234
```
**result**
```bash
Allocated slot number: 1
```

## Remove (Unpark) a Car:
Make sure you already in project directory, then run this command
```bash
$ node . leave {car_number} {hours}
```
*car_number* is number plat of the car hours is parking time of the car

**example**
```bash
$ node . leave KA-01-HH-1234 3
```
**result**
```bash
Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 20
```

## Print Status of Parking Slot:
Make sure you already in project directory, then run this command
```bash
$ node . status
```
**example**
```bash
$ node . status
```
**result**

![screenshot](https://github.com/arjunsumarlan/parkinglotproblem/blob/master/status.png?raw=true)
