import User from "../model/user.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from "../model/token.js";

dotenv.config();

export const signupUser = async (request, response) => {
    try{
        
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = { username: request.body.username, name: request.body.name, password: hashedPassword }

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({msg:'signup successful'})
    } catch(error){

        return response.status(500).json({msg:'Error signing the user (BACKEND PROB)'})  
    }

}




// LOGIN USER 


export const loginUser = async (request,response) => {
    //User has 
    let user = await User.findOne({username:request.body.username}); //finding username in DB

    if(!user){      //if username dosent match
        return response.status(400).json({msg: 'Invalid Username - No Match'})
    }

    try {
       let match = await bcrypt.compare(request.body.password, user.password);

       if(match){ //Checking to see if password matches
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token:refreshToken})
            await newToken.save();

            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })

       } else { //Throws error if it dosent match
        return response.status(400).json({msg: 'Password dosent match!'});
       }

    }catch (error){
        return response.status(500).json({msg:'Error while login in user'})
    }
}