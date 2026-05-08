package com.myblog.redis.configure;

import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * redis配置
 * Redis 的 “翻译官 + 格式设置”
 * 是 Redis 必须的配置文件，没有它，Redis 存啥都是乱码，不能用！
 * 
 * @author lijianhua
 */
@SuppressWarnings("deprecation")
@Configuration
@EnableCaching
public class RedisConfig extends CachingConfigurerSupport
{
    @Bean(name = "redisTemplate")
    @Primary
    @SuppressWarnings(value = { "unchecked", "rawtypes" })
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory)
    {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        // GenericJackson2JsonRedisSerializer = Spring 官方自带的 JSON 序列化器
        // 把 Java 对象 → 转成 JSON 存进 Redis从 Redis 取 JSON → 转回 Java 对象
        GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer();

        // 使用StringRedisSerializer来序列化和反序列化redis的key值
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);

        // Hash的key也采用StringRedisSerializer的序列化方式
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(serializer);

        template.afterPropertiesSet();
        return template;
    }
}
