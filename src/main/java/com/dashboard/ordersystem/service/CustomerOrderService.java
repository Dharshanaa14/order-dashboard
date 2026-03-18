package com.dashboard.ordersystem.service;
import com.dashboard.ordersystem.model.CustomerOrder;
import com.dashboard.ordersystem.repository.CustomerOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class CustomerOrderService {
    @Autowired
    private CustomerOrderRepository customerOrderRepository;
    public CustomerOrder saveOrder(CustomerOrder customerOrder) {
        if (customerOrder.getQuantity() != null && customerOrder.getUnitPrice() != null) {
            customerOrder.setTotalAmount(customerOrder.getQuantity() * customerOrder.getUnitPrice());
        }
        return customerOrderRepository.save(customerOrder);
    }
    public List<CustomerOrder> getAllOrders() {
        return customerOrderRepository.findAll();
    }
    public Optional<CustomerOrder> getOrderById(Long id) {
        return customerOrderRepository.findById(id);
    }
    public void deleteOrder(Long id) {
        customerOrderRepository.deleteById(id);
    }
    public CustomerOrder updateOrder(Long id, CustomerOrder updatedOrder) {
        CustomerOrder order = customerOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setFirstName(updatedOrder.getFirstName());
        order.setLastName(updatedOrder.getLastName());
        order.setEmail(updatedOrder.getEmail());
        order.setPhoneNumber(updatedOrder.getPhoneNumber());
        order.setProduct(updatedOrder.getProduct());
        order.setQuantity(updatedOrder.getQuantity());
        order.setUnitPrice(updatedOrder.getUnitPrice());
        order.setStatus(updatedOrder.getStatus());
        order.setCreatedBy(updatedOrder.getCreatedBy());
        if (order.getQuantity() != null && order.getUnitPrice() != null) {
            order.setTotalAmount(order.getQuantity() * order.getUnitPrice());
        }
        return customerOrderRepository.save(order);
    }
    public List<CustomerOrder> searchByEmail(String email) {
        return customerOrderRepository.findByEmail(email);
    }
    public long getOrderCount() {
        return customerOrderRepository.count();
    }
    public double getTotalRevenue() {
        return customerOrderRepository.findAll()
                .stream()
                .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0)
                .sum();
    }
    public List<CustomerOrder> getOrdersByStatus(String status) {
        return customerOrderRepository.findByStatus(status);
    }
}