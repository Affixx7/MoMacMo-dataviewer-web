export async function fetchImage({ index, bucket, project, folder, dataset, volume }) {
    const defaultOutput = "iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAAAAACupDjxAAAFPklEQVR42u2ZvWsqTRSH7//0g0UEYQmIIIIEBAtBEAIWFhaBgBCwsBBuEQtBEEHSWKSwCFhYSJoUKQIXLgRsLERSCBYSJFgsct7CndmP2RGi7np5OdtlTtw8mY/nnDn+on/8+cWADMiADMiADMiADMiADMiADMiADMiADMiADMiADMiADMiADMiADMiADMiADMiADMiA/0vAm6tMrliu1hoPncdBv9tq3FVKuXTSTC1pmzaT2WK11mj1Br12s35bKeWzydQnWdmYmc6X7xrtbrfdrFUKaTNWIJoY8atssVp/6PQ6rXq1mDFjudMBU9A8f2hjBAbeaBEwmifqqaPXpwN+NPMBHGa59U30Uksrf/G2vaHd433BMxovtaZEn+27jHvUKDzMz7IHN5NrL0V6aInYvOIO3M3kh2a3cjQzkr++G8t/yehszndIrEHchZFZu2NDF597fCfQ25Z7eBqzl3x+3lP87iL86w21ZeDF+5H9YNf3pvp+EVbn1syzxEjsfNObE5Gxd2cAAG79LxrYJ+nsHpR7SlHDm4j89gwvASD55f/tIQDUQxD1IiaOpOUPid12tXWPvqqrLnZEfBlGJvktJmqiqEhERu7RGoBqgPmVqT4X4KfwYYV0U5h3ja0MwFCP6toAjM9wcnFNTJTyZ99F5NUZawXP1ABALaRi4a/AaCqhoh0pOhMYBxJr9SXXqqfOV82I/JVQcsBEsL+7d2xHfcUbgEJo5ZZ04cAf2YlkWBaOiQHmJlhWo9AAt6aNkd0F2g0APvY/NwD01TcsDSBphVewtgIOg82etCP7zLEwgNSWAiXYCbGiPmCavmCfERHdA3gKKDqSgLEKEZCqWtN8JezIPRHNDCATsJJjOx4e4JveNA+izvvUH4WSs0nDujRda02zNCT7FEBup3546jFlOIADrWnsQg+IrSpBCds+2qOQATcJrWlmgr2skfEm/kPHHHUvbmpN45wgTUE6CKivzw8o50k1zR+H70azf3/mmOM6C2WtaWTJAPzRGOCewgec6E0jQ2XdneEjAkArrTWNLBnSVnAaLlIEgE5SU00zDKz9909HufaFBbiOaU0jSwZV01YSSFmRANK93jR97cVqDKAXUX/wQ28aGSoEXOZiq4gAHZ0oprnTmXr2k9v6yYAjnWlmjqrLahqeRga4vdKY5haaFtMmAZQoMkCnoTVQdqBc/qo/DY8jBJS1n9c0FcBYVDy1v/3kjnLM8YDOWr76LvZNp8tQ83YeehQl4HuQacpAfOWccWPhPtyxdaSAlFNN8w6g7S4ZGu4+Up2iBXxSTXMDmF9EtMvK2t+VhqcRA34n/KZ5A/DoLRke7DSc0lSwYQI67cyBk17sXoIsGezu1lhzhwoXcA6vaV4ADP0lQ1esfdqKHFB2VW3T5IFry99lML/t/Nen6AFfPKaZeJax5V7/JhBfXwBwl3GZZpfzVFgy06Qs2iSOdsxpgPTo+npk5CuwRJcBQ3o63jEnAq7j0jRW1ldfybora+WOd8yJgM40DZ6VG6XsMjROcMypgFM5TRnfN52eLsPxjjkVkEquL6fn+lifLgU4diAaWgud4JiTAa2khFjq650GXQyQOgKipcaegyrrqAFXtpDNgFW0UgcaSVEBintw/4DIXy4KuLdJchsU25gAkN5dFJDyCP7KRl5OH+mygEMAWY2IVzEg/nVhwK154EbeONEx5wCk7oFSYGHG5xcHpOWBU/C9ocsDhvswIAMyIAMyIAMyIAMyIAMyIAMyIAMyIAMyIAMyIAMyIAMyIAMy4D/6/AdhR419vDNESgAAAABJRU5ErkJggg==";
  
    const url = 'https://4g0io647a0.execute-api.us-east-1.amazonaws.com/Beta/image?';
    const params = new URLSearchParams({
      bucket, project, folder, dataset, volume, "frame": index.toString(),
      "scaleMin": "-100", "scaleMax": "100", "colorScale": "GRAY", "format": "PNG"
    });
  
    try {
      const response = await fetch(`${url}?${params}`);
      if (response.ok) {
        const stringResponse = await response.text();
        const formattedResponse = stringResponse.substring(1, stringResponse.length - 1);
        console.log(formattedResponse);
        return atob(formattedResponse); // Decode Base64
      } else {
        console.error('Error fetching image:', response.statusText);
        return atob(defaultOutput);
      }
    } catch (error) {
      console.error('Network or other error:', error);
      return atob(defaultOutput);
    }
  }