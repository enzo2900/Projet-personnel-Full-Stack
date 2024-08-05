package com.example.demo.aspect;


import jakarta.servlet.http.HttpServletResponse;

import java.net.http.HttpResponse;

public class AccessDeniedException extends RuntimeException {
    public HttpServletResponse response ;
    @java.io.Serial
    private static final long serialVersionUID = 6878364983674394167L;

    /**
     * Constructs a {@code SecurityException} with no detail message.
     */
    public AccessDeniedException() {
        super();
    }

    /**
     * Constructs a {@code SecurityException} with the specified
     * detail message.
     *
     * @param   s   the detail message.
     */
    public AccessDeniedException(String s) {
        super(s);
    }

    /**
     * Creates a {@code SecurityException} with the specified
     * detail message and cause.
     *
     * @param message the detail message (which is saved for later retrieval
     *        by the {@link #getMessage()} method).
     * @param cause the cause (which is saved for later retrieval by the
     *        {@link #getCause()} method).  (A {@code null} value is permitted,
     *        and indicates that the cause is nonexistent or unknown.)
     * @since 1.5
     */
    public AccessDeniedException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Creates a {@code SecurityException} with the specified cause
     * and a detail message of {@code (cause==null ? null : cause.toString())}
     * (which typically contains the class and detail message of
     * {@code cause}).
     *
     * @param cause the cause (which is saved for later retrieval by the
     *        {@link #getCause()} method).  (A {@code null} value is permitted,
     *        and indicates that the cause is nonexistent or unknown.)
     * @since 1.5
     */
    public AccessDeniedException(Throwable cause) {
        super(cause);
    }

    public AccessDeniedException(String message, HttpServletResponse re) {
        super(message);
        response = re;
    }
}
