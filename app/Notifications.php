<?php

namespace App;
/**
 * 
 */
class Notifications
{
	
	private $to_many;
	private $body;
	private $title;
	private $icon;
	private $click_action;
	private $headers;
	function __construct($params)
	{
		$this->to_many = $params['to'];
		$this->body = $params['body'];
		$this->title = $params['title'];
		$this->icon = $params['icon'];
		$this->click_action = $params['click_action'];
		$this->headers = [
			'Authorization: key=AAAA1PeFdlU:APA91bGecypN2YFUJNzy70qTiPA1KBO-X0s6Doe4GmZp6ULXc2W-MavyK2m3hEyTOINQaAj-MDn1ZD38Iojcpv2kJeucdUgdXBZSKmULe9u0NjviHG3EPFaxLh4Z7CgssPWiHcgVQ_FO',
			'Content-Type:application/json'
		];
	}

	public function send()
	{
		$url = "https://fcm.googleapis.com/fcm/send";
		// dd($this->to_many);
		foreach ($this->to_many as $to) {
			// dd($to);
			$fields = array(
				'to' => $to,
				"notification" => array(
					'body' => $this->body, 
					'title' => $this->title, 
					'icon' => $this->icon, 
					'click_action' => $this->click_action,
				)
			);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headers);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
			$result = curl_exec($ch);
			curl_close($ch);
			// return $result;
		}
	}
}