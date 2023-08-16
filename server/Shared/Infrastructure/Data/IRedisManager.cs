using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public interface IRedisManager
    {
        void Delete(string key);
        void Set(string key, string value);
        string Get(string key);
        void Set<T>(string key, T value) where T : class;
        void Set<T>(string key, T value, TimeSpan expireTime) where T : class;
        T Get<T>(string key) where T : class;
        bool TryGetValue(string key, out object value);
        Task<T> GetAsync<T>(string key) where T : class;
        T GetOrCreate<T>(string key, T value) where T : class;
        Task<T> GetOrCreateAsync<T>(string key, T value) where T : class;
    }
}
