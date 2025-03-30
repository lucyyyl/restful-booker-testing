import { test, expect } from '@playwright/test';
import { roomDeleteRequest, roomGetRequest, roomPostRequest, roomPutRequest } from '../../helpers/APIBuilders';
import { createRoom, deleteRoom, login } from '../../helpers/APIHelpers';

test.describe('Room API', () => {
  test.beforeEach(async ({ request }) => {
    await login(request);
  });

  test('should create a room, retrive the room and delete the room @API', async ({ request }) => {
    const newRoom = await roomPostRequest(request);
    expect((newRoom).status(), 'Room POST request has code 201').toEqual(201);
    const resp = JSON.parse(await newRoom.text());
    const roomid = resp.roomid;

    let retriveRoom = await roomGetRequest(request);
    expect(retriveRoom.ok(), 'Room GET request has success code').toBeTruthy();
    expect(await retriveRoom.text()).toContain(`"roomid":${roomid}`);

    const deleteRoom = await roomDeleteRequest(request, roomid);
    expect(deleteRoom.ok(), 'Room DELETE request has success code').toBeTruthy();

    retriveRoom = await roomGetRequest(request, roomid);
    expect(retriveRoom.status(), 'Room GET request has 500 error code').toBe(500);
  });

  test('should return an error when an invalid room creation request is sent @API', async ({ request }) => {
    const newRoom = await roomPostRequest(request, "");
    expect(newRoom.status(), 'Room POST request has 400 status code').toEqual(400);
    const resp = JSON.parse(await newRoom.text());
    const error = resp.error;
    expect(error, 'Error should be "BAD_REQUEST"').toBe('BAD_REQUEST');
  });

  test('should update room information @API', async ({ request }) => {
    const roomid = await createRoom(request);

    const updateRoom = await roomPutRequest(request, roomid);
    expect(updateRoom.ok(), 'Room PUT request should have successful status code').toBeTruthy();

    let retriveRoom = await roomGetRequest(request, roomid);
    expect(retriveRoom.ok(), 'Room GET request to have successful status code').toBeTruthy();
    let roomType = JSON.parse(await retriveRoom.text()).type;
    expect(roomType, 'Room type should be "Double"').toBe('Double');

    await deleteRoom(request, roomid);
  });

});
