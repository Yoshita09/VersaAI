import { clerkClient } from "@clerk/express";

// Middleware to check userId and hasPremiumPlan

export const auth = async (req, res, next) => {
    try {
        const{ userId, has} = await req.auth();
        const hasPremiumPlan = await has({ plan: 'premium' });

        const user = await clerkClient.users.getUser(userId);

        if(!hasPremiumPlan && user.privateMetadata.free_uasge){
            req.free_uasge=user.privateMetadata.free_uasge;
        }else{
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: { free_uasge: 0 }
            })
            req.free_uasge=0;
        }

        req.plan = hasPremiumPlan ? 'premium' : 'free';
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}