package com.dashboard.ordersystem.controller;
import com.dashboard.ordersystem.model.CustomerOrder;
import com.dashboard.ordersystem.service.CustomerOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class CustomerOrderController {
    @Autowired
    private CustomerOrderService customerOrderService;
    @PostMapping
    public CustomerOrder createOrder(@RequestBody CustomerOrder customerOrder) {
        return customerOrderService.saveOrder(customerOrder);
    }
    @GetMapping
    public List<CustomerOrder> getAllOrders() {
        return customerOrderService.getAllOrders();
    }
    @GetMapping("/search")
    public List<CustomerOrder> searchByEmail(@RequestParam String email) {
        return customerOrderService.searchByEmail(email);
    }
    @GetMapping("/count")
    public long getOrderCount() {
        return customerOrderService.getOrderCount();
    }
    @GetMapping("/revenue")
    public double getTotalRevenue() {
        return customerOrderService.getTotalRevenue();
    }
    @GetMapping("/{id}")
    public Optional<CustomerOrder> getOrderById(@PathVariable Long id) {
        return customerOrderService.getOrderById(id);
    }
    @PutMapping("/{id}")
    public CustomerOrder updateOrder(@PathVariable Long id, @RequestBody CustomerOrder customerOrder) {
        return customerOrderService.updateOrder(id, customerOrder);
    }
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {
        customerOrderService.deleteOrder(id);
        return "Order deleted successfully";
    }
    @GetMapping("/status")
    public List<CustomerOrder> getOrdersByStatus(@RequestParam String status) {
        return customerOrderService.getOrdersByStatus(status);
    }
}