const {StatusCodes}=require('http-status-codes')
const {BookingService}=require('../services/index');

const bookingService=new BookingService();
const {createChannel,publishMessage}=require('../utils/messageQueue');

const {REMINDER_BINDING_KEY}=require('../config/serverConfig');

class BookingController{
    constructor(){}

    async sendMessageToQueue(req,res){
        const channel=await createChannel();
        const payload={
            data:{
                subject:"This is noti from queue",
                content:'Some queue will subscribe this',
                recepientEmail:'prathamd549@gmail.com',
                notificationTime: '2024-06-02T15:47:53' 
        },
        service:'CREATE_TICKET'
    };
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
        return res.status(200).json({
            message:"Successfully published the event",
        })
    }

    async create (req,res){
        try {
            console.log(req.body)
            const response=await bookingService.createBooking(req.body);
            console.log(response)
            return res.status(StatusCodes.OK).json({
                data:response,
                message:'Successfully completed booking',
                success:true,
                err:{},
                
            })
    
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode).json({
                message:error.message,
                success:false,
                data:{},
                err:error.explanation 
            })
        }
    }
}


module.exports=BookingController;