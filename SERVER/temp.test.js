import EventModel from "#models/events.model.js";
const model = new EventModel();

try {
    const [res] = await model.findAll();
    console.log(res);
} catch (error) {
    throw error;
}