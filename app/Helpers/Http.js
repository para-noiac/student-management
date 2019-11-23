'use strict'

class Http {
   static error({ error='Error.', message='Something went wrong.', data=null, status_code=500}, res){
      respond({ data, error, message, status_code }, res)
   }

   /* 

    */
   static respond(...args) {
      let res = args[args.length-1]
      // could check if instanceof ServerResponse /* If Needed */
      switch(args.length){
         case 2: {
            let status_code = args[0]
            res.status(status_code)
            res.send()
            break
         }
         default: {
            let { data=null, error=null, message='Ok.' } = args[0]
            let status_code = args[0].status_code || 200
            res.status(status_code)
            res.send({ data, error, message })
            break
         }
      }
   }
}

module.exports = Http