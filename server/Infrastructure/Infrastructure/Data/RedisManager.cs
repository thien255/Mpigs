using Microsoft.Extensions.Configuration;
using StackExchange.Redis;
using System.Text.Json;

namespace Infrastructure.Data
{
    public class RedisManager : IRedisManager
    {
        private TimeSpan expireTime;
        private IDatabase db;

        public RedisManager(IConnectionMultiplexer connect, IConfiguration configuration)
        {
            db = connect.GetDatabase();
            var timeOut = configuration.GetValue<int>("redisTimeOut");
            expireTime = TimeSpan.FromMinutes(timeOut);
        }

        public void Delete(string key)
        {
            try
            {
                db.KeyDelete(key);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteAsync(string key)
        {
            try
            {
                await db.KeyDeleteAsync(key);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Set(string key, string value)
        {
            try
            {
                db.StringSet(key, value, expireTime);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task SetAsync(string key, string value)
        {
            try
            {
                await db.StringSetAsync(key, value, expireTime);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string Get(string key)
        {
            return db.StringGet(key);
        }

        public void Set<T>(string key, T value) where T : class
        {
            try
            {
                db.StringSet(key, JsonSerializer.Serialize(value), expireTime);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void Set<T>(string key, T value, TimeSpan expireTime) where T : class
        {
            try
            {
                db.StringSet(key, JsonSerializer.Serialize(value), expireTime);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public T Get<T>(string key) where T : class
        {
            try
            {
                var value = db.StringGet(key);
                return JsonSerializer.Deserialize<T>((string)value);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool TryGetValue(string key, out object value)
        {
            value = db.StringGet(key);
            if (value == null)
            {
                return false;
            }
            return true;
        }
        public Task<T> GetAsync<T>(string key) where T : class
        {
            try
            {
                var value = db.StringGet(key);
                return JsonSerializer.Deserialize<Task<T>>((string)value);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public T GetOrCreate<T>(string key, T value) where T : class
        {
            var result = db.StringGetSet(key, JsonSerializer.Serialize(value));
            return JsonSerializer.Deserialize<T>((string)result);
        }
        public async Task<T> GetOrCreateAsync<T>(string key, T value) where T : class
        {
            var result = db.StringGetSetAsync(key, JsonSerializer.Serialize(value)).Result;
            return JsonSerializer.Deserialize<T>((string)result);

        }
    }
}
