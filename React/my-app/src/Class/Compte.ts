export function isAPassword(password : string) {
    return password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!\"#$%&'()*+,\\-./:;<=>?@^_`{|}~])[A-Za-z\\d!\"#$%&'()*+,\\-./:;<=>?@^_`{|}~]{8,}");
}