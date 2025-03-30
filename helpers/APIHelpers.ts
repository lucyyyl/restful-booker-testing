import { APIRequestContext, expect } from "@playwright/test";
import { authLoginPostRequest, roomDeleteRequest, roomGetRequest, roomPostRequest } from "./APIBuilders";

export async function createRoom(request:APIRequestContext): Promise<number>{
    const newRoom = await roomPostRequest(request);
    expect((newRoom).status(), 'Room POST request has 201 status code').toEqual(201);
    const resp = JSON.parse(await newRoom.text());
    return resp.roomid;
}

export async function deleteRoom(request:APIRequestContext, roomId: number) {
    const deleteRoom = await roomDeleteRequest(request, roomId);
    expect(deleteRoom.ok(), 'Room DELETE request to have successful status code').toBeTruthy();

    const retriveRoom = await roomGetRequest(request, roomId);
    expect(retriveRoom.status(), 'Room GET request to have 500 error code').toBe(500);
}

export async function login(request:APIRequestContext): Promise<string> {
    const loginResponse = await authLoginPostRequest(request);
    expect((loginResponse).status(), 'Login POST request to have 200 status code').toEqual(200);
    const headers = (loginResponse).headers();
    const cookies = headers['set-cookie'];
    return cookies.split('=')[1].split(';')[0];
}