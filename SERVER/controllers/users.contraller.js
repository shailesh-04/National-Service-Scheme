import model from '#models/users.model.js'
export const signup = async (req, res) => {
    model.create(req.body,(err,data)=>{
        if(err) return res.status(406).json(err.sqlMessage);
        res.status(201).json("new user is create");
    });
};
export const findAll = (req,res)=>{
    model.findAll((err,data)=>{
        if(err) return res.status(406).json(err.sqlMessage);
        res.status(200).json(data);
    });
}
export const singin = (req,res)=>{
    model.findOne(req.body,(err,data)=>{
        if(err) return res.status(406).json(err.sqlMessage);
        if(data.length > 0)
            res.status(200).json(data);
        else
            return res.status(404).json("User Name And Password Is Not Valid");
    });
}
