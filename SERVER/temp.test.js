try {
    console.log("Outer try block");

    try {
        console.log("Inner try block");
        throw new Error("Inner error");
    } catch (innerError) {
        console.error("Caught in inner catch:", innerError.message);
        // You can rethrow the error if you want it to be caught by the outer catch
        throw new Error("New error from inner catch");
    }

} catch (outerError) {
    console.error("Caught in outer catch:", outerError.message);
} finally {
    console.log("Outer finally block - always executes");
}
