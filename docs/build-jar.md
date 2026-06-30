
# 打jar包
cd /Users/lijianhua/Documents/其他/个人官网/my-blog
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH="$JAVA_HOME/bin:$PATH"

mvn -f backend/gateway/pom.xml clean package -DskipTests
mvn -f backend/services/auth-center/pom.xml clean package -DskipTests
mvn -f backend/services/blog-service/pom.xml clean package -DskipTests


# 打包后的位置：
java -jar backend/gateway/target/gateway-0.0.1-SNAPSHOT.jar

## 如果报错
你之前打不出 jar 的原因是 Maven 默认用了 JDK 8（会报 无效的标记: --release ），该项目（Spring Boot 3.x）要求 Java 17。