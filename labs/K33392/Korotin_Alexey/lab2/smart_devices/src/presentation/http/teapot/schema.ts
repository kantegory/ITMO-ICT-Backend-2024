

/**
 * @swagger
 * components:
 *      schemas:
 *          CreateTeapotRequest:
 *              type: object
 *              required:
 *                  - name
 *                  - profileId
 *                  - temperature
 *                  - capacity
 *                  - waterSupply
 *              properties:
 *                  name:
 *                      type: string
 *                  profileId:
 *                      type: string
 *                      format: uuid
 *                  temperature:
 *                      type: number
 *                  capacity:
 *                      type: number
 *                  waterSupply:
 *                      type: number
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          TeapotSubscription:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      format: uuid
 *                  eventType:
 *                      type: string
 *                  handlerType:
 *                      type: string
 *          TeapotResponse:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      format: uuid
 *                  name:
 *                      type: string
 *                  profileId:
 *                      type: string
 *                      format: uuid
 *                  temperature:
 *                      type: number
 *                  capacity:
 *                      type: number
 *                  watterSupply:
 *                      type: number
 *                  state:
 *                      type: string
 *                      enum:
 *                          - OFFLINE
 *                          - WAITING
 *                          - WORKING
 *                          - OUT_OF_WATER
 *                  subscriptions:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/TeapotSubscription'
 */
export type TeapotSubscription = {
    id: string;
    eventType: string;
    handlerType: string;
}

export type TeapotResponse = {
    id: string;
    name: string;
    profileId: string;
    temperature: number;
    capacity: number;
    waterSupply: number;
    state: string;
    subscriptions: TeapotSubscription[];
}