//this file defines what the external APIs send back to us

//this interface is for API requests failing beause of something like bad internet, server is temp unavailable or our request got rejected
export interface ApiError{
    message: string; //error message
    status?: number; //question mark means the property is optional
    //status is optional because we won't always get a HTTP code if for example there was a network issue
}

//this interface is for defining successful APIs
export interface ApiResult<T>{ //T is a generic placeholder for a data type we didn't decide on yet
    success: boolean;
    data?: T;
    error?: ApiError;
}