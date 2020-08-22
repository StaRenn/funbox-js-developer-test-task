export default store => next => action => {
    if(action.payload && action.payload.generateId === true){
        // Math.random should be unique because of its seeding algorithm.
        action.payload.id = '_' + Math.random().toString(36).substr(2, 9);
    }
    next(action)
}