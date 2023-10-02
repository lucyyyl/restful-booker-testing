import { APIRequestContext } from "@playwright/test";
import { adminPassword, adminUsername, authAPIURL, roomsAPIURL } from "./envVars";

export async function authLoginPostRequest(request: APIRequestContext, username = adminUsername, password = adminPassword) {
    return await request.post(`${authAPIURL}login`, {
        data: {
            "username": username,
            "password": password
          }
    })
}

export async function roomPostRequest(
    request: APIRequestContext,
    roomName = "108",
    roomtype = "Single", 
    roomAccessibility = false,
    roomImage = "https://www.mwtestconsultancy.co.uk/img/room1.jpg",
    roomDescrption = "a description",
    roomFeatures = ["TV", "WiFi", "Views"],
    roomPrice = 160
    ) {
    return await request.post(roomsAPIURL, {
        data: {
          "roomName": roomName,
          "type": roomtype,
          "accessible": roomAccessibility,
          "image": roomImage,
          "description": roomDescrption,
          "features": roomFeatures,
          "roomPrice": roomPrice
        }
    });
}

export async function roomGetRequest(request: APIRequestContext, roomId?: number) {
    return roomId != null ? await request.get(`${roomsAPIURL}${roomId}`) : await request.get(roomsAPIURL);
}


export async function roomDeleteRequest(request: APIRequestContext, roomId: number) {
    return await request.delete(`${roomsAPIURL}${roomId}`);
}
