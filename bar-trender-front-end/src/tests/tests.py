from selenium import webdriver  
import time  
from selenium.webdriver.common.keys import Keys  
print("sample test case started")  
options = webdriver.ChromeOptions()
options.binary_location = "C:\Program Files\Google\Chrome\Application\chrome.exe"
chrome_driver_binary = "C:/Users/migue/OneDrive/Escritorio/uni/ISPP/proyecto/BarTrenderFront/bar-trender-front-end/src/tests/chromedriver.exe"
driver = webdriver.Chrome(chrome_driver_binary, chrome_options=options)
 
#driver=webdriver.firefox()  
#driver=webdriver.ie()  
#maximize the window size  
driver.maximize_window()  
#navigate to the url  
driver.get("localhost:3000")  
#identify the Google search text box and enter the value  
driver.find_element_by_name("q").send_keys("javatpoint")  
time.sleep(3)  
#click on the Google search button  
driver.find_element_by_name("btnK").send_keys(Keys.ENTER)  
time.sleep(3)  
#close the browser  
driver.close()  
print("sample test case successfully completed")  