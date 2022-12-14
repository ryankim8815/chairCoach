"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorResponse_1 = require("../responses/errorResponse");
// import { nullPrototypeHandler } from "../utils/nullPrototypeHandler";
var logger = require("../config/logger");
var index_1 = require("../discord/index");
function errorHandler(error, // 적절한 타입 찾기
req, res, next) {
    (0, index_1.discordForWinston)(error);
    if (error.status) {
        logger.error(error);
        return res.status(error.status).json(error);
    }
    logger.error("common:", error);
    return res.status(400).json(errorResponse_1.common);
}
exports.errorHandler = errorHandler;
/**
 * 2XX Success
 * 200: get 요청 성공
 * 201: post/put 요청으로 새로운 리소스 생성
 * 204: delete 요청으로 반환할 데이터가 없는 성공 (put 변화가 없을 때에도)
 *
 * 3XX Redirection
 * 301: 요청한 리소스가 응답 헤더의 Location에 주어진 URL로 완전히 옮겨짐
 * 302: 301과 유사하나 '일시적'
 * 304: 캐시목적으로 사용, 요청 후 수정된 사항이 없을 때 사용(이 경우 캐시 데이터를 그대로 보여줌)
 *
 * 4XX Client Error
 * 400: Bad Request - api 정의를 따르지않아 발생한 오류
 * 401: Unauthorized - 로그인이 필요한 기능에 비로그인 상태로 접근 (클라이언트 인식 불가)
 * 로그인시 서버에 있는 유저의 정보와 일치하지 않거나 인증자격증명이 필요한 페이지에 인증자격증명이 없는 채로 접속을 시도할 때 나타내는 것으로 많이 사용됩니다.
 * 402: Payment Required - 현재 사용되고 있지 않음
 * 403: Forbidden - 권한이 없는 접근 (클라이언트 인식)
 * 404: Not Found - 서버에 클라이언트가 요청한 리소스 없음
 * 405: Method Not Allowed - 요청한 메소드는 서버에서 알고 있지만, 제거되었고 사용할 수 없습니다. 예를 들어, 어떤 API에서 리소스를 삭제하는 것을 금지할 수 있습니다. 필수적인 메소드인 GET과 HEAD는 제거될 수 없으며 이 에러 코드를 리턴할 수 없습니다.
 * 409: Conflict - 이 응답은 요청이 현재 서버의 상태와 충돌될 때 보냅니다.
 * 418: I'm a teapot - IETF에서 만우절 장난으로 만든 응답코드 https://haneepark.github.io/2019/12/24/418-im-a-teapot/
 *
 * 5XX Server Error
 * 500: Internal Server Error - 200 OK와 비슷하게 서버 오류에 대해서 포괄적으로 사용
 * 클라이언트의 요청을 처리하는 과정에서 DB에서 오류가 발생하는 등 요청이 잘못된 것이 아니라 서버측에서 문제가 생겼을 때 사용
 * (예시) 회원가입을 하는 로직
 *     1) 유저가 이미 존재하는 이메일을 통해 회원가입을 시도
 *     2) 이것을 중간에 검사하지 않고 DB에 회원을 추가적으로 가입시키려 시도
 *     3) 유일성 문제 등에 의해 DB 에러, 즉 서버 에러가 발생
 * 501: Not Implemented - 서버에서 지원되지 않으므로 처리할 수 없습니다. 서버가 지원해야 하는 유일한 방법은 GET와 HEAD이다. 이 코드는 반환하면 안됩니다.
 * 502: Bad Gateway - 이 오류 응답은 서버가 요청을 처리하는 데 필요한 응답을 얻기 위해 게이트웨이로 작업하는 동안 잘못된 응답을 수신했음을 의미합니다.
 * 503 Service Unavailable - 서버의 과부하, 점검 등의 이유로 일시적인 서버 접근 불가능
 *
 */
