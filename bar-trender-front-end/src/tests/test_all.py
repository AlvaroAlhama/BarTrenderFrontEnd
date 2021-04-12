import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestAll(StaticLiveServerTestCase):
  def setup_method(self, method):
    options = webdriver.ChromeOptions()
    options.headless = True
    self.driver = webdriver.Chrome(options=options)
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_loginFailView(self):
    # Test name: LoginFailView
    # Step # | name | target | value
    # 1 | open | /main | 
    self.driver.get(f'{self.live_server_url}/')
    # 2 | click | id=login-tooltip | 
    self.driver.find_element(By.ID, "login-tooltip").click()
    # 3 | click | css=.btn:nth-child(1) | 
    self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(1)").click()
    # 4 | waitForElementPresent | css=.my-1 > .text-danger | 2000
    WebDriverWait(self.driver, 2000).until(expected_conditions.presence_of_element_located((By.CSS_SELECTOR, ".my-1 > .text-danger")))
    # 5 | verifyText | css=.my-1 > .text-danger | Email o contraseña incorrecta.
    assert self.driver.find_element(By.CSS_SELECTOR, ".my-1 > .text-danger").text == "Email o contraseña incorrecta."
   
  def test_loginView(self):
    # Test name: LoginView
    # Step # | name | target | value
    # 1 | open | /main | 
    self.driver.get(f'{self.live_server_url}/')
    # 2 | click | id=login-tooltip | 
    self.driver.find_element(By.ID, "login-tooltip").click()
    # 3 | type | id=email | client1@gmail.com
    self.driver.find_element(By.ID, "email").send_keys("client1@gmail.com")
    # 4 | type | name=password | vekto1234
    self.driver.find_element(By.NAME, "password").send_keys("vekto1234")
    # 5 | click | css=.btn:nth-child(1) | 
    self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(1)").click()
    # 6 | waitForElementPresent | id=logout-tooltip | 2000
    WebDriverWait(self.driver, 2000).until(expected_conditions.presence_of_element_located((By.ID, "logout-tooltip")))
    # 7 | verifyElementPresent | id=logout-tooltip | 
    elements = self.driver.find_elements(By.ID, "logout-tooltip")
    assert len(elements) > 0

  def test_filters(self):
    # Test name: Filters
    # Step # | name | target | value
    # 1 | open | /main | 
    self.driver.get(f'{self.live_server_url}/')
    # 2 | click | id=filters | 
    time.sleep(2)
    self.driver.find_element(By.ID, "filters").click()
    # 5 | click | css=.tab-pane:nth-child(7) .form-check-sign | 
    time.sleep(2)
    self.driver.find_element(By.ID, "discount-label").click()
    # 6 | click | css=.btn:nth-child(1) | 
    time.sleep(2)
    self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(1)").click()
    # 8 | verifyText | css=.col-lg-3:nth-child(1) .card-title | La teteria | Teteria Andauni
    assert self.driver.find_element(By.CSS_SELECTOR, ".col-lg-3:nth-child(1) .card-title").text == "La teteria | Teteria Andauni"

  def test_listView(self):
    # Test name: ListView
    # Step # | name | target | value
    # 1 | open | /main | 
    self.driver.get(f'{self.live_server_url}/')
    # 2 | click | css=.mr-1 | 
    self.driver.find_element(By.CSS_SELECTOR, ".mr-1").click()
    # 3 | click | css=.btn:nth-child(1) | 
    self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(1)").click()
    # 4 | runScript | window.scrollTo(0,221) | 
    self.driver.execute_script("window.scrollTo(0,221)")
    # 5 | click | css=.list | 
    self.driver.find_element(By.CSS_SELECTOR, ".list").click()
    # 6 | verifyText | xpath=//p[contains(.,'La teteria | Teteria Andauni')] | La teteria | Teteria Andauni
    assert self.driver.find_element(By.XPATH, "//p[contains(.,\'La teteria | Teteria Andauni\')]").text == "La teteria | Teteria Andauni"

  def test_establishmentDetailsView(self):
    # Test name: EstablishmentDetailsView
    # Step # | name | target | value
    # 1 | open | /main | 
    self.driver.get(f'{self.live_server_url}/')
    # 2 | click | css=.mr-1 | 
    time.sleep(2)
    self.driver.find_element(By.ID, "filters").click()
    time.sleep(2)
    # 3 | click | css=.btn:nth-child(1) | 
    self.driver.find_element(By.ID, "filter-search").click()
    # 4 | runScript | window.scrollTo(0,224) | 
    self.driver.execute_script("window.scrollTo(0,224)")
    # 5 | click | css=.col-lg-3:nth-child(1) img | 
    self.driver.find_element(By.CSS_SELECTOR, ".col-lg-3:nth-child(1) img").click()
    time.sleep(2)
    # 6 | verifyText | css=h3 | Información del establecimiento
    assert self.driver.find_element(By.CSS_SELECTOR, "h3").text == "Información del establecimiento"

  def test_getQRNotLogged(self):
    # Test name: GetQRNotLogged
    # Step # | name | target | value
    # 1 | open | /main | 
    self.driver.get(f'{self.live_server_url}/')
    # 2 | click | css=.mr-1 | 
    self.driver.find_element(By.ID, "filters").click()
    time.sleep(2)
    # 3 | click | css=.btn:nth-child(1) | 
    self.driver.find_element(By.ID, "filter-search").click()
    time.sleep(2)
    # 4 | click | css=.col-lg-3:nth-child(1) img | 
    self.driver.find_element(By.CSS_SELECTOR, ".col-lg-3:nth-child(1) img").click()
    time.sleep(2)
    # 5 | click | css=.btn-default | 
    self.driver.find_element(By.CSS_SELECTOR, ".btn-default").click()
    time.sleep(2)
    # 6 | verifyText | css=.App > p | Necesitas haber iniciado sesión para poder ver el descuento
    assert self.driver.find_element(By.CSS_SELECTOR, ".App > p").text == "Necesitas haber iniciado sesión para poder ver el descuento"

  def test_getQRClaimed(self):
    # Test name: GetQRClaimed
    # Step # | name | target | value
    # 1 | open | /main | 
    self.driver.get(f'{self.live_server_url}/')
    # 2 | click | id=login-tooltip | 
    self.driver.find_element(By.ID, "login-tooltip").click()
    # 3 | click | id=email | 
    self.driver.find_element(By.ID, "email").click()
    # 4 | type | name=password | vekto1234
    self.driver.find_element(By.NAME, "password").send_keys("vekto1234")
    # 5 | type | id=email | client1@gmail.com
    self.driver.find_element(By.ID, "email").send_keys("client1@gmail.com")
    # 6 | click | css=.btn:nth-child(1) | 
    self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(1)").click()
    # 7 | waitForElementPresent | css=.mr-1 | 2000
    time.sleep(2)
    # 8 | click | css=.mr-1 | 
    self.driver.find_element(By.ID, "filters").click()
    # 9 | waitForElementPresent | xpath=//div[7]/div/label/span | 5000
    time.sleep(2)
    # 10 | click | xpath=//div[7]/div/label/span | 
    self.driver.find_element(By.ID, "discount-label").click()
    # 11 | click | css=.btn:nth-child(1) | 
    self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(1)").click()
    time.sleep(2)
    # 12 | runScript | window.scrollTo(0,272) | 
    self.driver.execute_script("window.scrollTo(0,272)")
    # 13 | click | css=.col-lg-3:nth-child(4) img | 
    self.driver.find_element(By.CSS_SELECTOR, ".col-lg-3:nth-child(4) img").click()
    time.sleep(2)
    # 14 | click | css=.btn-default | 
    self.driver.find_element(By.CSS_SELECTOR, ".btn-default").click()
    time.sleep(2)
    # 17 | verifyText | css=.App > p | D005: Descuento ya escaneado por usuario
    assert self.driver.find_element(By.CSS_SELECTOR, ".App > p").text == "D005: Descuento ya escaneado por usuario"

  def test_getQRSuccess(self):
    # Test name: GetQRSuccess
    # Step # | name | target | value
    # 1 | open | /main | 
    self.driver.get(f'{self.live_server_url}/')
    # 2 | click | id=login-tooltip | 
    self.driver.find_element(By.ID, "login-tooltip").click()
    # 3 | click | id=email | 
    self.driver.find_element(By.ID, "email").click()
    # 4 | type | name=password | vekto1234
    self.driver.find_element(By.NAME, "password").send_keys("vekto1234")
    # 5 | type | id=email | client1@gmail.com
    self.driver.find_element(By.ID, "email").send_keys("client1@gmail.com")
    # 6 | click | css=.btn:nth-child(1) | 
    self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(1)").click()
    # 7 | waitForElementPresent | css=.mr-1 | 2000
    time.sleep(2)
    # 8 | click | css=.mr-1 | 
    self.driver.find_element(By.ID, "filters").click()
    # 9 | click | css=.btn:nth-child(1) | 
    self.driver.find_element(By.ID, "filter-search").click()
    # 10 | click | css=.col-lg-3:nth-child(1) img | 
    self.driver.find_element(By.CSS_SELECTOR, ".col-lg-3:nth-child(1) img").click()
    # 11 | click | css=.btn-default | 
    self.driver.find_element(By.CSS_SELECTOR, ".btn-default").click()
    # 12 | assertElementPresent | css=.App > img | 
    elements = self.driver.find_elements(By.CSS_SELECTOR, ".App > img")
    assert len(elements) > 0

  def test_mulipleFilters(self):
    # Test name: MulipleFilters
    # Step # | name | target | value
    # 1 | open | /main | 
    self.driver.get(f'{self.live_server_url}/')
    # 2 | click | id=filters | 
    self.driver.find_element(By.ID, "filters").click()
    time.sleep(2)
    # 3 | click | css=.fa-beer | 
    self.driver.find_element(By.CSS_SELECTOR, ".fa-beer").click()
    # 4 | click | css=.active > .form-check:nth-child(3) .form-check-sign | 
    time.sleep(2)
    self.driver.find_element(By.ID, "label-Cruzcampo").click()
    time.sleep(2)
    # 5 | click | css=.location_world | 
    self.driver.find_element(By.CSS_SELECTOR, ".location_world").click()
    time.sleep(2)
    # 6 | click | css=.active > .form-check:nth-child(2) .form-check-sign | 
    self.driver.find_element(By.ID, "label-Triana").click()
    time.sleep(2)
    # 7 | click | id=filter-search | 
    self.driver.find_element(By.ID, "filter-search").click()
    time.sleep(2)
    # 8 | click | xpath=//section[@id='list-results']/ul/div/div/div/img | 
    self.driver.find_element(By.XPATH, "//section[@id=\'list-results\']/ul/div/div/div/img").click()
    time.sleep(2)
    # 9 | verifyText | css=p:nth-child(5) | Triana
    assert self.driver.find_element(By.CSS_SELECTOR, "p:nth-child(5)").text == "Triana"

  def test_dashboardNotLogged(self):
    # Test name: DashboardNotLogged
    # Step # | name | target | value
    # 1 | open | /admin/dashboard | 
    self.driver.get(f'{self.live_server_url}/')
    time.sleep(1)
    self.driver.get(f'{self.live_server_url}/admin/dashboard')
    # 2 | verifyText | css=h1 | Necesitas estar Logueado para poder acceder a la vista
    assert self.driver.find_element(By.CSS_SELECTOR, "h1").text == "Necesitas estar Logueado para poder acceder a la vista"

