/**
 * @swagger
 * /users:
 *      post:
 *         summary: 유저 추가하기
 *         tags: [Users]
 *         requestBody:
 *                  required: true
 *                  content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 user:
 *	                                   type: String
 *	                                   example: 철수
 *                                 email:
 *	                                   type: string
 *	                                   example: qqq@naver.com
 *                                 phone:
 *	                                   type: string
 *	                                   example: 01012345678
 *                                 personal:
 *	                                   type: string
 *	                                   example: 123456-1234567
 *                                 prefer:
 *	                                   type: string
 *	                                   example: naver.com
 *                                 pwd:
 *	                                   type: string
 *	                                   example: 1234
 *         responses:
 *             '200':
 *                 description: 유저 등록
 *                 content:
 *                       application/json:
 *                          schema:
 *                            type: string
 *                            example: 61ee1b7272a81036fc429a05
 */

/**
 * @swagger
 * /users:
 *      get:
 *          summary: 유저 목록 가져오기
 *          tags: [Users]
 *          responses:
 *              200:
 *                  description: 유저정보
 *                  content:
 *                      application/json:
 *                          schema:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                  user:
 *	                                    type: String
 *	                                    example: 철수
 *                                  email:
 *	                                    type: string
 *	                                    example: qqq@naver.com
 *                                  phone:
 *	                                    type: string
 *	                                    example: 010-1234-5678
 *                                  personal:
 *	                                    type: string
 *	                                    example: 123456-1234567
 *                                  prefer:
 *	                                    type: string
 *	                                    example: naver.com
 *                                  pwd:
 *	                                    type: string
 *	                                    example: 1234
 *                                  og:
 *	                                    type: object
 *	                                    properties:
 *	                                        title:
 *	                                            type: string
 *	                                        url:
 *	                                            type: string
 *	                                        image:
 *	                                            type: string
 *	                                        description:
 *	                                            type: string
 *
 *
 *
 *
 *
 */
