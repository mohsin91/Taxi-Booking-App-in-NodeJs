
Status = [
    {
      key: 'Ordered',
      value: 0
    },
    {
      key: 'DriverAccepted',
      value: 1
    },
    {
      key: 'DriverArrived',
      value: 2
    },
    {
      key: 'RideStarted',
      value: 3
    },
    {
      key: 'RideEnded',
      value: 4
    },
    {
      key: 'PaymentDone',
      value: 5
    },
    {
      key: 'Cancelled',
      value: 6
    }
   
  ]
  userStatusEnum = [
    {
      key: 'unregistered',
      value: 0
    },
    {
      key: 'unverified',
      value: 1
    },
    {
      key: 'verified',
      value: 2
    },
    {
      key: 'code_set',
      value: 3
    },
    {
      key: 'geolocation_set',
      value: 4
    },
    {
      key: 'terms_accepted',
      value: 5
    }
   
  ]
//  userStatusEnum = {
//     unregistered: 0,
//     unverified: 1,
//     verified: 2,
//     code_set: 3,
//     geolocation_set: 4,
//     terms_accepted: 5
//   };
module.exports={
Status,
userStatusEnum
};