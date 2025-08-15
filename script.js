
const apiKey = "49cb6d3bb34347058fc201759251308"; 

document.addEventListener("DOMContentLoaded", () => {
  
    const cityInput     = document.getElementById("city-input");
    const searchBtn     = document.getElementById("search-btn");
    const weatherResult = document.getElementById("weather-result");
    const errorBox      = document.getElementById("error-message");
    const errorText     = document.getElementById("error-text") || errorBox.querySelector("p");
  
    const cityName   = document.getElementById("city-name");
    const localTime  = document.getElementById("local-time");
    const weatherIcon= document.getElementById("weather-icon");
    const temperature= document.getElementById("temperature");
    const condition  = document.getElementById("condition");
    const feelsLike  = document.getElementById("feels-like");
    const humidity   = document.getElementById("humidity");
    const windSpeed  = document.getElementById("wind-speed");
    const pressure   = document.getElementById("pressure");
    const visibility = document.getElementById("visibility");
    const uvIndex    = document.getElementById("uv-index");

    if (!cityInput.value) cityInput.value = "Arapiraca";
  
    function setLoading(isLoading) {
      if (!searchBtn) return;
      searchBtn.disabled = isLoading;
      searchBtn.textContent = isLoading ? "Buscando..." : "Buscar";
    }
  
    function showError(message) {
      weatherResult.classList.add("hidden");
      errorBox.classList.remove("hidden");
      errorText.textContent = message || "Ocorreu um erro ao buscar os dados.";
    }
  
    function hideError() {
      errorBox.classList.add("hidden");
    }
  
    async function fetchWeather(city) {
      if (!apiKey || apiKey === "SUA_API_KEY_AQUI") {
        showError("Defina sua API Key em script.js para continuar.");
        return;
      }
  
      try {
        setLoading(true);
        hideError();
  
        const q = encodeURIComponent(city);
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}&aqi=no&lang=pt`;
        const res = await fetch(url);
  
    
        const payload = await res.json().catch(() => null);
  
        if (!res.ok) {
          const apiMsg = payload?.error?.message;
          throw new Error(apiMsg || "Falha na solicitação.");
        }
  
        renderWeather(payload);
      } catch (err) {
        const msg = err?.message || "Erro desconhecido.";
        showError(msg);
        console.debug("Weather error:", err);
      } finally {
        setLoading(false);
      }
    }
  
    function renderWeather(data) {
      weatherResult.classList.remove("hidden");
      hideError();
  
      cityName.textContent  = `${data.location.name}, ${data.location.country}`;
      localTime.textContent = `Horário Local: ${data.location.localtime}`;
  
      const rawIcon = data.current?.condition?.icon || "";
      const iconUrl = rawIcon.startsWith("http") ? rawIcon : `https:${rawIcon}`;
      weatherIcon.src = iconUrl;
      weatherIcon.alt = data.current?.condition?.text || "Ícone do tempo";
  
      temperature.textContent = `${data.current.temp_c}°C`;
      condition.textContent   = data.current.condition.text;
  
      feelsLike.textContent = `${data.current.feelslike_c}°C`;
      humidity.textContent  = `${data.current.humidity}%`;
      windSpeed.textContent = `${data.current.wind_kph} km/h`;
      pressure.textContent  = `${data.current.pressure_mb} mb`;
      visibility.textContent= `${data.current.vis_km} km`;
      uvIndex.textContent   = data.current.uv;
    }
  
    searchBtn.addEventListener("click", () => {
      const city = cityInput.value.trim();
      if (city) fetchWeather(city);
      else showError("Por favor, digite o nome de uma cidade.");
    });
  
    cityInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });
    fetchWeather("Arapiraca,BR");
  });