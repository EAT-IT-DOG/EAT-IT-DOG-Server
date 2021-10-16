from selenium import webdriver
import sys
import base64

options = webdriver.ChromeOptions()

options.add_argument("headless")

driver = webdriver.Chrome('chromedriver.exe', options=options)

driver.get('https://www.google.com/maps/search/%EB%8F%99%EB%AC%BC%EB%B3%91%EC%9B%90/@' + sys.argv[1] +',' + sys.argv[2] + ',11z')

driver.implicitly_wait(3)

for i in range(1, 11, 2):
    try:
        driver.find_element_by_xpath(f'//*[@id="pane"]/div/div[1]/div/div/div[4]/div[1]/div[' + str(i) + ']/div/a').click()
    except:
        print("ERROR")
        continue
    name = driver.find_element_by_xpath('//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[1]/div[1]/h1/span[1]').text # 이름
    address = driver.find_element_by_xpath('//*[@id="pane"]/div/div[1]/div/div/div[7]/div[1]/button/div[1]/div[2]/div[1]').text
    driver.find_element_by_xpath('//*[@id="omnibox-singlebox"]/div[1]/div[1]/button').click()
    text = "이름:" + name + "\n주소:" + address + "\n"
    print(base64.b64encode(text.encode('utf-8')))

driver.quit()