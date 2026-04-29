package com.myblog.common.exception;

/**
 * Business exception model
 * 中文描述：业务异常模型，用于表示业务逻辑中的异常情况
 * @param message 异常消息
 * @return BusinessException 异常实例
 */
public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }
}
