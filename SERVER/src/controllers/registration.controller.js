import { catchErr } from "#color";
import model from "#models/registration.model.js";
import EventModel from "#models/events.model.js";
const modelEvent = new EventModel();
class RegistratoinController {
    static async getAll(req, res) {
        try {
            model.getAll((err, entries) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                res.json(entries);
            });
        } catch (error) {
            catchErr(error,"registratoin getAll");
            return res.status(500).json({ message:"Internal Server Error:" + error });
        }
    }
    static async inEventfindUsers(req, res) {
        try {
            const id = req.params.id;
            model.inEventfindUsers(id,(err, entries) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                else if(entries.length)
                    res.json(entries);
                else
                    return res.status(404).json({message:"No Row Found"});
            });
        } catch (error) {
            catchErr(error,"registratoin inEventfindUsers");
            return res.status(500).json({ message:"Internal Server Error:" + error });
        }
    }
    static async create(req, res) {
        try {
            const {user_id,event_id} = req.body;
            model.create([user_id,event_id],(err, entries) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                modelEvent.addNUmOfUser(event_id,(err,result)=>{
                    if(err)
                        console.error("Icrement Number Of User In evet:",err.sqlMessage);

                    res.json({message:"Add New Register"});
                });
            });
        } catch (error) {
            catchErr(error,"registratoin create");
            return res.status(500).json({ message:"Internal Server Error:" + error });
        }
    }
    static async changeStatus(req, res) {
        try {
            const id = req.params.id;
            const {status} = req.body;
            model.changeStatus(id,status,(err, entries) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                res.json({message:"Status Is Changes :"});
            });
        } catch (error) {
            catchErr(error,"registratoin create");
            return res.status(500).json({ message:"Internal Server Error:" + error });
        }
    }
    static async check(req,res) {
        try {
            const {user_id,event_id} = req.body;
            model.check([user_id,event_id],(err, entries) => {
                if (err)
                    return res.status(406).json({ message: err.sqlMessage });
                else if(entries.length)
                    res.json(entries);
                else
                    return res.status(404).json({message:"No Row Found"});
            });
        } catch (error) {
            catchErr(error,"registratoin check");
            return res.status(500).json({ message:"Internal Server Error:" + error });
        }
    }
}

export default RegistratoinController;
