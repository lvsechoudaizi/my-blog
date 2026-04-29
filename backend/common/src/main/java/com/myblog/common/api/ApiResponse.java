package com.myblog.common.api;
/**
 * API response model
 * 中文描述：API响应模型，包含请求是否成功、消息和数据字段
 * 统一响应体工具类= 前端的 接口统一返回格式封装
 * @param <T> 响应数据类型
 * @param success 是否请求成功
 * @param message 响应消息
 * @param data 响应数据
 * @return ApiResponse<T> 响应模型实例
 */
public record ApiResponse<T>(boolean success, String message, T data) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "OK", data);
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    public static <T> ApiResponse<T> failure(String message) {
        return new ApiResponse<>(false, message, null);
    }
}
