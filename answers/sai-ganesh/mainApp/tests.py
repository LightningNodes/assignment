from django.test import TestCase, Client
from django.urls import reverse

class AuthenticationTestCase(TestCase):
    def setUp(self):
        # Set up the test client
        self.client = Client()

    def test_home_view(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'home.html')

    def test_render_crypto_table_view(self):
        response = self.client.get(reverse('renderCryptoTable'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'cryptoTable.html')

    def test_signup_view_get(self):
        response = self.client.get(reverse('signup'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'signup.html')

    def test_login_view_get(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'login.html')

    def test_login_view_post_success(self):
        response = self.client.post(reverse('login'), {'email': 'test@example.com', 'password': 'password123'})

        # Should redirect to renderCryptoTable page
        self.assertEqual(response.status_code, 302)  
        self.assertRedirects(response, reverse('renderCryptoTable'))

    def test_login_view_post_failure(self):
        response = self.client.post(reverse('login'), {'email': 'test@gmail', 'password': '0'})

        # Should stay on the login page
        self.assertEqual(response.status_code, 200)  
        self.assertTemplateUsed(response, 'login.html')
    
