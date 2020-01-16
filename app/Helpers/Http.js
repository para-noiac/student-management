'use strict'

class Http {
   static error({ error='Error.', message='Something went wrong.', data=null, status=500}, res){
      respond({ data, error, message, status }, res)
   }

   static badreq(err, res){
      error({...err, status:400}, res)
   }

   /* 

    */
   static respond(...args) {
      let res = args[args.length-1]
      // could check for instanceof ServerResponse /* If Needed */

      switch(typeof(args[0])){
         case 'number': {
            let status = args[0]
            res.status(status)
            res.send()
            break
         }
         default: {
            // let { data=null, error=null, message='Ok.' } = args[0]
            let data = args[0]

            if(data.error){
               data = { error: data.error, message: data.message }
            } 

            let status = args[0].status || 200
            res.status(status)
            // res.send({ data, error, message })
            res.send(data)
            break
         }
      }
   }
}

module.exports = Http