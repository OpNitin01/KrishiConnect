function getCropPrice(){
      const city=document.getElementById('city').value.trim();
      const crop=document.getElementById('crop').value.trim();
      const qty=document.getElementById('quantity').value.trim();
      const result=document.getElementById('priceResult');
      if(!city||!crop||!qty){result.textContent='Please fill all details.';return;}
      const mockPrices={wheat:28,rice:42,maize:25,sugarcane:35,cotton:60};
      const price=mockPrices[crop.toLowerCase()]||(25+Math.random()*20).toFixed(2);
      const total=(price*qty).toFixed(2);
      result.innerHTML=`Current ${crop} price in ${city}: <b>₹${price}/kg</b><br>Estimated Total for ${qty} kg: <b>₹${total}</b>`;
    }

    async function getWeatherData(){
      const city=document.getElementById('weatherCity').value.trim();
      const date=document.getElementById('weatherDate').value.trim();
      const output=document.getElementById('weatherOutput');
      if(!city||!date){output.textContent='Please fill both fields.';return;}
      output.textContent='Fetching weather data...';
      try{
        const res=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const geo=await res.json();
        if(!geo.results||geo.results.length===0)throw new Error('City not found');
        const {latitude,longitude}=geo.results[0];
        const weatherRes=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&start_date=${date}&end_date=${date}`);
        const weatherData=await weatherRes.json();
        const tmax=weatherData.daily.temperature_2m_max[0];
        const tmin=weatherData.daily.temperature_2m_min[0];
        const rain=weatherData.daily.precipitation_sum[0];
        output.innerHTML=`Weather on ${date} in ${city}:<br>🌡️ Max: ${tmax}°C | Min: ${tmin}°C<br>🌧️ Rain: ${rain} mm`;
      }catch(e){output.textContent='Unable to fetch weather data. Try again.';}
    }