export default function cookieExtractor(req) {
    return req?.cookies?.token || null;
}
